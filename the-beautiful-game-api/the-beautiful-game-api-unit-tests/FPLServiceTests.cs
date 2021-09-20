using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Moq;
using Moq.Protected;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using the_beautiful_game_api.Configuration;
using the_beautiful_game_api.Models;
using the_beautiful_game_api.Services;
using Xunit;

namespace the_beautiful_game_api_unit_tests
{
    public class FPLServiceTests
    {
        private readonly FPLService _fplService;
        private Mock<HttpClient> _httpClient;
        private Mock<HttpMessageHandler> _httpMessageHandler;
        private Mock<IOptions<FPLOptions>> _options;
        private Mock<IMapper> _mapper;
        private List<FplPlayerResult> fplPlayers = new List<FplPlayerResult>()
        {
            new FplPlayerResult()
            {
                First_Name = "John",
                Second_Name = "Smith",
                Code = 12345,
                ImageUrl = "url",
                Element_Type = 1
            }
        };
        private List<PlayerResult> playerResults = new List<PlayerResult>()
        {
            new PlayerResult()
            {
                FirstName = "John",
                Surname = "Smith",
                Id = 12345,
                ImageUrl = "url",
                Position = "Defender"
            }
        };
        private List<FplPlayerMatchStats> fplPlayerMatchStats = new List<FplPlayerMatchStats>()
        {
            new FplPlayerMatchStats()
        };
        private PlayerProfile playerProfile = new PlayerProfile();

        public FPLServiceTests()
        {
            _httpMessageHandler = new Mock<HttpMessageHandler>();
            _httpClient = new Mock<HttpClient>(_httpMessageHandler.Object);
            _options = new Mock<IOptions<FPLOptions>>();
            _mapper = new Mock<IMapper>();
            _fplService = new FPLService(
                _httpClient.Object,
                _options.Object,
                _mapper.Object);

            _httpClient.Object.BaseAddress = new Uri("https://fantasy.premierleague.com/api/");
        }

        [Fact]
        public async Task GET_PlayerSearchResults_ShouldReturnPlayerResults()
        {
            _httpMessageHandler.Protected().Setup<Task<HttpResponseMessage>>("SendAsync",
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent("{'elements': " + JsonConvert.SerializeObject(fplPlayers) + "}")
                });
            _options.Setup(x => x.Value).Returns(new FPLOptions() { ImageUrl = "url" });
            _mapper.Setup(x => x.Map<List<PlayerResult>>(It.IsAny<List<FplPlayerResult>>())).Returns(playerResults);

            var value = (List<PlayerResult>)Assert.IsType<OkObjectResult>(await _fplService.GetPlayerSearchResults("Smith")).Value;
            Assert.IsType<List<PlayerResult>>(value);

            _httpMessageHandler.Protected().Verify("SendAsync",
                Times.Once(),
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>());
            _mapper.Verify(x => x.Map<List<PlayerResult>>(It.IsAny<List<FplPlayerResult>>()), Times.Once);
        }

        [Fact]
        public async Task GET_PlayerSearchResults_ShouldReturn500IfError()
        {
            _httpMessageHandler.Protected().Setup<Task<HttpResponseMessage>>("SendAsync",
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                });

            var statusCode = Assert.IsType<StatusCodeResult>(await _fplService.GetPlayerSearchResults("Smith"));
            Assert.Equal((int)HttpStatusCode.InternalServerError, statusCode.StatusCode);

            _httpMessageHandler.Protected().Verify("SendAsync",
                Times.Once(),
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>());
        }

        [Fact]
        public async Task GET_PlayerProfile_ShouldReturnPlayerProfile()
        {
            _httpMessageHandler.Protected().Setup<Task<HttpResponseMessage>>("SendAsync",
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent("{'history': " + JsonConvert.SerializeObject(fplPlayerMatchStats) + "}")
                });
            _mapper.Setup(x => x.Map<PlayerProfile>(It.IsAny<FplPlayerSeason>())).Returns(playerProfile);

            var value = (PlayerProfile)Assert.IsType<OkObjectResult>(await _fplService.GetPlayerProfile(new PlayerResult())).Value;
            Assert.IsType<PlayerProfile>(value);

            _httpMessageHandler.Protected().Verify("SendAsync",
                Times.Once(),
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>());
            _mapper.Verify(x => x.Map<PlayerProfile>(It.IsAny<FplPlayerSeason>()), Times.Once);
        }

        [Fact]
        public async Task GET_PlayerProfile_ShouldReturn500IfError()
        {
            _httpMessageHandler.Protected().Setup<Task<HttpResponseMessage>>("SendAsync",
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                });

            var statusCode = Assert.IsType<StatusCodeResult>(await _fplService.GetPlayerProfile(new PlayerResult()));
            Assert.Equal((int)HttpStatusCode.InternalServerError, statusCode.StatusCode);

            _httpMessageHandler.Protected().Verify("SendAsync",
                Times.Once(),
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>());
        }
    }
}
